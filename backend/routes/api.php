<?php


/*
 *
 * API Routes
 * 
 */

Route::group(['middleware' => 'api'], function () {

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
    
    Route::group(['prefix' => 'users'], function(){
        Route::post('/', 'UserController@index'); // Needs Admin Role 
    });
});
