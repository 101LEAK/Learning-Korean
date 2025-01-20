document.addEventListener("DOMContentLoaded", function() {
    const commentForm = document.getElementById('commentForm');
    const commentsDiv = document.getElementById('comments');
    const successMessage = document.getElementById('successMessage');

    // Function to load comments from localStorage
    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('comments')) || []; // Retrieve comments from localStorage
        commentsDiv.innerHTML = ''; // Clear the current list of comments

        // Display each comment
        comments.forEach(function(comment, index) {
            const newComment = document.createElement('div');
            newComment.classList.add('comment');
            newComment.innerHTML = `
                <strong>${comment.name}</strong>: <p>${comment.text}</p>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            commentsDiv.appendChild(newComment);
        });

        // Add event listeners for delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', deleteComment);
        });
    }

    // Load comments from localStorage when the page is loaded
    loadComments();

    // Event listener for form submission
    commentForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the form from reloading the page

        // Get the user's name and comment
        const name = document.getElementById('name').value.trim();
        const comment = document.getElementById('comment').value.trim();

        // Check if name and comment are provided
        if (name === "" || comment === "") {
            alert("Please fill in both fields!");
            return;
        }

        // Create a new comment object
        const newComment = {
            name: name,
            text: comment
        };

        // Retrieve existing comments from localStorage, or create an empty array if none exist
        const comments = JSON.parse(localStorage.getItem('comments')) || [];

        // Add the new comment to the array
        comments.push(newComment);

        // Save the updated comments array back to localStorage
        localStorage.setItem('comments', JSON.stringify(comments));

        // Add the new comment to the page (without refreshing the page)
        const newCommentElement = document.createElement('div');
        newCommentElement.classList.add('comment');
        newCommentElement.innerHTML = `
            <strong>${name}</strong>: <p>${comment}</p>
            <button class="delete-btn">Delete</button>
        `;
        commentsDiv.appendChild(newCommentElement);

        // Add event listener for the delete button
        const deleteButton = newCommentElement.querySelector('.delete-btn');
        deleteButton.addEventListener('click', deleteComment);

        // Show the success message
        successMessage.style.display = 'block';

        // Hide success message after 3 seconds
        setTimeout(function() {
            successMessage.style.display = 'none';
        }, 3000);

        // Clear the form fields after submission
        document.getElementById('name').value = '';
        document.getElementById('comment').value = '';
    });

    // Delete comment function
    function deleteComment(event) {
        // Get the index of the comment to be deleted
        const index = event.target.getAttribute('data-index');
        
        // Retrieve the comments from localStorage
        const comments = JSON.parse(localStorage.getItem('comments')) || [];

        // Remove the comment from the array
        comments.splice(index, 1);

        // Save the updated comments array back to localStorage
        localStorage.setItem('comments', JSON.stringify(comments));

        // Reload the comments to update the page
        loadComments();
    }
});
