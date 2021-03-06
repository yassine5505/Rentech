<?php


/*
 *
 * API Routes
 * 
 */

Route::group(['middleware' => 'api'], function () {
    // Auth Routes
    Route::group(['prefix' => 'auth'], function(){
        Route::post('login', 'AuthController@login');
        Route::post('signup', 'AuthController@signup');
        Route::post('logout', 'AuthController@logout');
        Route::post('refresh', 'AuthController@refresh');
        Route::post('me', 'AuthController@me');
        Route::post('update', 'AuthController@update');
        Route::post('sendPasswordResetLink', 'ResetPasswordController@sendEmail');
        Route::post('resetPassword', 'ChangePasswordController@process');
    });
    
    // User Routes
    Route::group(['prefix' => 'users'], function(){
        Route::post('/', 'UserController@index');
        Route::post('{id}', 'UserController@show');
        Route::post('{id}/delete', 'UserController@delete');    
    });

    // Car Routes
    Route::group(['prefix' => 'cars'], function(){
        Route::post('/', 'CarController@index');
        Route::post('create', 'CarController@create');
        Route::post('{id}', 'CarController@show');
        Route::post('{id}/update', 'CarController@update');
        Route::post('{id}/delete', 'CarController@delete');
    });

    // City Routes
    Route::group(['prefix' => 'cities'], function(){
        Route::post('/', 'CityController@index');
        Route::post('create', 'CityController@create');
        Route::post('{id}', 'CityController@show');
        Route::post('{id}/update', 'CityController@update');
    });

    // Ad Routes
    Route::group(['prefix' => 'ads'], function(){
        Route::post('create', 'AdController@create');
        Route::post('/', 'AdController@index');
        Route::post('all', 'AdController@all');
        Route::post('{id}/update', 'AdController@update');
        Route::post('{id}/delete', 'AdController@delete');
        Route::post('{id}/show', 'AdController@show');
    });

    // Reservation Routes
    Route::group(['prefix' => 'reservations'], function(){
        Route::post('/', 'ReservationController@index');
        Route::post('create', 'ReservationController@create');
        Route::post('{id}/validate', 'ReservationController@valid');
        Route::post('{id}/cancel', 'ReservationController@cancel');
    });


    // Score Routes
    Route::group(['prefix' => 'scores'], function(){
        Route::post('verify', 'ScoreController@verify');
        Route::post('user', 'ScoreController@evaluateUser');
        Route::post('car', 'ScoreController@evaluateCar');
        Route::post('/', 'ScoreController@index');
        Route::post('{id}', 'ScoreController@show');
    });


    // Image Route
    Route::get('image/{id}', function($id){
        $url = \App\Image::find($id)->url;
        $type = Storage::mimeType($url);
        $file = Storage::get($url);
        return Response::make($file,200)->header('Content-type', $type);
    });
    

    // Stat Routes
    Route::post('stat', 'StatController@stat');
});
