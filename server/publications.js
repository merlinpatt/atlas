var BASE_URL = 'http://match.ventureforamerica.org/api/';

function publishAPIData(collectionName) {
  Meteor.publish(collectionName, function () {
    var self = this;
    var url = BASE_URL + collectionName;
    var options = {
      params: {

      }
    };

    try {
      console.log('Retrieving data from ' + url);

      var response = HTTP.get(url, options);
      _.each(response.data, function (model) {
        model['allText'] = JSON.stringify(model).toLowerCase();
        self.added(collectionName, model.id, model);
        self.ready();
      });

    }
    catch (error) {
      console.log(error);
    }
  });
}

publishAPIData('fellows');
publishAPIData('companies');
publishAPIData('cities');
