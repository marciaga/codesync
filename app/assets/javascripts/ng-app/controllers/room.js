//this is the controller for the Main App page
angular.module('AngularRails')
    .controller('RoomCtrl', function ($scope, $http, $firebase) {
        // voting starts here 
        // establish a new array in Firebase
        var upvoteRef = new Firebase('https://educationalapp.firebaseio.com/likes');
        // initialize
        upvoteRef.on('value', function f(s) {
            $('#likes').text(0 + s.val());
        });
        // Up votes function (increments by 1)
        $('#btn').click(function() {
          upvoteRef.transaction(function(current_value) {
            return current_value + 1;
          });
        });
        // Resets the counter to 0
        $('#reset').click(function() {
            upvoteRef.set(0);
        });
         // establish a new array in Firebase
        var downvoteRef = new Firebase('https://educationalapp.firebaseio.com/dislikes');
        // initialize dislikes
        downvoteRef.on('value', function f(s) {
            $('#dislikes').text(0 + s.val());
        });
        // Down votes function (increments by 1)
        $('#dislike-btn').click(function() {
          downvoteRef.transaction(function(current_value) {
            return current_value + 1;
          });
        });
        // Resets the counter to 0
        $('#dislike-reset').click(function() {
            downvoteRef.set(0);
        });
       /// scrolling chat
       var fireBaseRef = new Firebase("https://educationalapp.firebaseio.com/messages");
        $('#messageInput').keypress(function (e) {
            if (e.keyCode == 13) {
              var name = $('#nameInput').val();
              var text = $('#messageInput').val();
              fireBaseRef.push({name:name, text:text});
              $('#messageInput').val('');
            }
        });
        //scrolling part
        fireBaseRef.on('child_added', function(snapshot) {
            var commentsContainer = $('#comments-container');
            var message = snapshot.val();
            $('<div/>').text(message.text).prepend($('<em/>').text(message.name+': ')).appendTo($('#comments-container'));
            commentsContainer.scrollTop(commentsContainer.prop('scrollHeight'));
        });
    });