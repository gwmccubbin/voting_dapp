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

    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Election.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election);

      // Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);

      return App.render()
    });
  },

  render: function() {
    App.renderCandidatesResults();
    App.renderCandidatesBallot();
    App.renderAccount();
  },

  renderCandidatesResults: function() {
    var electionInstance;

    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidatesCount();
    }).then(function(candidatesCount) {
      var candidatesResults = $('#candidatesResults');
      candidatesResults.empty();

      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.candidates(i).then(function(candidate) {
          // Display candiate results in table
          App.renderCandidateResult(
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

  renderCandidateResult: function(id, name, voteCount) {
    console.log(id, name, voteCount)
    // Fetch candidate list
    var candidatesResults = $('#candidatesResults');

    // Fetch candidate template & fill it in
    var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td><tr>"

    // Add candidate to the list
    candidatesResults.append(candidateTemplate);
  },

  renderCandidatesBallot: function() {
    var electionInstance;
    var hasVoted;

    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return instance.voters(App.account);
    }).then(function(voted) {
      console.log("Has Voted", voted)
      hasVoted = voted;
      if(hasVoted) {
        throw new Error('Candidate has already voted');
      }
      return electionInstance.candidatesCount();
    }).then(function(candidatesCount) {
      // Don't render the form if account has voted
      var candidatesSelect = $('#candidatesSelect');
      candidatesSelect.empty();

      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.candidates(i).then(function(candidate) {
          // Display candidate options in select
          App.renderCandidateOption(
            candidate[0], // id
            candidate[1], // name
          );
        });
      }
      App.loading = false;
    }).catch(function(error) {
      console.log(error.message);
    });
  },

  renderCandidateOption: function(id, name) {
    // Fetch candidate list
    var candidatesSelect = $('#candidatesSelect');

    // Create a candidate option
    var candidateOption = "<option value='" + id + "' >" + name + "</ option>"

    // Add candidate selection
    candidatesSelect.append(candidateOption);
  },

  renderAccount: function() {
    // Get the main account on node we're connected to
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });
  },

  castVote: function() {
    var candidateId = $('#candidatesSelect').val();
    console.log("Voting for candidate...", candidateId);

    App.contracts.Election.deployed().then(function(instance) {
      return instance.vote(candidateId, {
        from: App.account,
        gas: 500000 // Gas limit
      });
    }).then(function(result) {
      // Do nothing
    }).catch(function(err) {
      console.error(err);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
