App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  loading: false,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }

    App.renderAccount();

    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Election.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election);

      // Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);

      // Render layout here
      return App.renderCandidates();
    });
  },

  renderCandidates: function() {
    if (App.loading) {
      return;
    }
    App.loading = true;

    var electionInstance;

    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidatesCount();
    }).then(function(candidatesCount) {
      var candidatesList = $('#candidatesList');
      candidatesList.empty();

      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.candidates(i).then(function(candidate) {
          App.renderCandidate(
            candidate[0], // id
            candidate[1], // name
            candidate[2], // voteCount
          );
        });
      }
      App.loading = false;
    }).catch(function(error) {
      App.loading = false;
    });
  },

  renderCandidate: function(id, name, voteCount) {
    // Fetch candidate list
    var candidatesList = $('#candidatesList');

    // Fetch candidate template & fill it in
    var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td><tr>"

    // Add candidate to the list
    candidatesList.append(candidateTemplate);
  },

  renderAccount: function() {
    // Get the main account on node we're connected to
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
