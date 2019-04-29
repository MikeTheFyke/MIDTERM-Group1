// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

$(document).ready(function() {



//for each of the json which the users topics and it has createTopicEleement inside it
function renderTopics(topics){
$('.wall-container').empty();
topics.forEach((topic) => {
 // console.log("here is my topic", topic);
 $('.wall-container').prepend(createTopicElement(topic));
})
}


//create topic element.

function createTopicElement(topic){
 //make sure you know what topicData is. we know we will be retrieving the whole row from resources
 // console.log("topicData contains: ", topicData);
 //figure out a way to find the topic_id from topicData and put that topic id inside a topic container.
// console.log('topic analysis: ', topic);
 let topicTitle = topic.title;
 let $topicTitle = $('<div>').addClass('topic-title').text(topicTitle);
 //we added an id to the topic-container so we can .empty the correct topic container
 let $topicContainer = $('<div>').addClass('topic-grid-container').attr('id', topicTitle);


    $topicContainer.append($topicTitle);
      return $topicContainer;
}


function loadTopics(){
 $.ajax({
   type: 'GET',
   url: "/api/topics/retrieve_topic", //  request sent to this url //
   dataType: 'JSON'
 })

 .done( topics => {
   // console.log("PLEASEEEEE save me!!! json topics data is", topics);
   renderTopics(topics);
//lookup

//

 })
}

loadTopics();


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
    // console.log("received resources",resources);

    //loop through each topic and if it matches the topic id, empty it.
    // $("#").empty();
    // resources.forEach( (resource) => {
    //   let topicOfResource = resource.topics_id;
    //       console.log("Resource value are", resource);
    // $(`#${topicOfResource}`).empty();
    //   // $(`#${topicOfResource}`).prepend(createResourceElement(resource));
    // })
    //getting rid of all resources
    for(let i = 0; i < resources.length; i++){
      let topicOfResource = resources[i].topics_id;
    $(`#${topicOfResource}`).empty()
    }

    resources.forEach( (resource) => {

      let topicOfResource = resource.topics_id;
      $(`#${topicOfResource}`).prepend(createResourceElement(resource));
    })

  }

function renderTopics(topics){
$('.wall-container').empty();
topics.forEach((topic) => {
 // console.log("here is my topic", topic);
 $('.wall-container').prepend(createTopicElement(topic));
})
}



//when we empty all the resources in the resource container and then put the resource back inside how do we know which one.
  function createResourceElement(resource){
     let url = resource.url;
     let resourceDescription = resource.description;
     let resourceTitle = resource.title;
     let resourceTopic = resource.topics_id;

     let $resourceURL = $('<div>').addClass("resource-url").text(url);
     //will $resourceDescription collide with regular version???????
     let $resourceDescription = $('<div>').addClass("resource-description").text(resourceDescription);
     let $resourceTitle = $('<div>').addClass("resource-title").text(resourceTitle);
     let $resourceTopic = $('<div>').addClass("resource-topic").text(resourceTopic);


     let $resourceContainer = $('<div>').addClass('resource-container');

     $resourceContainer.append($resourceURL, $resourceDescription, $resourceTitle)

           return $resourceContainer;
  }

loadResource();



});


//resource

