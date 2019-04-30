
$(document).ready(function() {
//CREATE RESOURCE
function loadResource(){
  $.ajax({
    type: 'GET',
    url: "/api/resources/retrieve_resource",
    dataType: 'JSON'
  })
  .done( resources => {
    console.log("resource data are: ", resources);
    renderResources(resources);
  })
}

  function renderResources(resources) {

    const insertedTopic = resources[resources.length()-1].topic_id;
    //loop through each topic and if it matches the topic id, empty it.
    $(#insertedTopic).empty();
    data.forEach( (resource) => {
      console.log("Here is my resource",resource);
      $('#insertedTopic').prepend(createResourceElement(resource));
    })
  }
//when we empty all the resources in the resource container and then put the resource back inside how do we know which one.
  function createResourceElement(resource){
     console.log("resource data contains:", resource);
     let url = resource.url;
     let resourceDescription = resource.description;
     let resourceTitle = resource.title;

     let $resourceURL = $('<div>').addClass("resource-url").text(url);
     //will $resourceDescription collide with regular version???????
     let $resourceDescription = $('<div>').addClass("resource-description").text(resourceDescription);
     let $resourceTitle = $('<div>').addClass("resource-title").text(resourceTitle);

     let $resourceContainer = $('<div>').addClass('resource-container');
     $resourceContainer.append($resourceURL, $resourceDescription, $resourceTitle);
           return $resourceContainer;
  }

loadResource();

});
