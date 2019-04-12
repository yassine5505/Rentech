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
        Route::post('/', 'UserController@index'); // All Users  
        Route::post('{id}', 'UserController@show'); // Get user by Id
        Route::post('delete/{id}', 'UserController@delete'); // Get user by Id        
    });

    // Car Routes
    Route::group(['prefix' => 'cars'], function(){
        Route::post('create', 'CarController@create');
        Route::post('{id}/update', 'CarController@update');
        Route::post('/', 'CarController@index'); 
    });
});
