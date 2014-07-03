
app.controller(
	"ImagesController",	
	function( $scope, imagesService ) {

		// I hold the uploaded images.
		$scope.images = [];

		// I handle upload events for the images (ie, the response from the server).
		$scope.$on( "imageUploaded", handleImageUploaded );

		// Load the remote data from the server.
		loadRemoteData();


		// ---
		// PUBLIC METHODS.
		// ---


		// I delete the given image.
		$scope.deleteImage = function( image ) {

			// Immediately remove the image locally - we'll assume best case scendario
			// with server-side communication; there's no reason that this should throw
			// an error on a normal usage basis.
			removeImage( image.id );

			// Delete from remote data store.
			imagesService.deleteImage( image.id ).then(
				function( response ) {

					console.info( "Image deleted scucessfully." );

				},
				function( error ) {

					alert( "Oops! " + error.message );

				}
			);

		};


		// ---
		// PRIVATE METHODS.
		// ---


		// I apply the remote data to the local scope.
		function applyRemoteData( images ) {

			$scope.images = images;

		}


		// I handle the image upload response from the server.
		function handleImageUploaded( event, image ) {

			$scope.images.push( image );

		}


		// I get the remote data from the server.
		function loadRemoteData() {

			imagesService.getAllImages().then(
				function getAllImagesSuccess( response ) {

					applyRemoteData( response );

				},
				function getAllImagesError( error ) {


					alert( "Oops! " + error.message );

				}
			);

		}


		// I delete the image with the given ID from the local collection.
		function removeImage( id ) {

			for ( var i = 0, length = $scope.images.length ; i < length ; i++ ) {

				if ( $scope.images[ i ].id == id ) {

					return( $scope.images.splice( i, 1 ) );

				}

			}

		}

	}
);
