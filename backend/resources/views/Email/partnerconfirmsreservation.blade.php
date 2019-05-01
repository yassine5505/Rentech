@component('mail::message')
# Dear 

Merci d'avoir choisi Rentech
@component('mail::button', ['url' => 'website.com')])
Click Here
@endcomponent

If you did not request a signup , no further action is required.

Thanks,
{{ config('app.name') }}
@endcomponent
