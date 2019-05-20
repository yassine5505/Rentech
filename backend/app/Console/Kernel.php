<?php
namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
        'App\Console\Commands\SendReviewsForm',
        Commands\SendReviewsForm::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('reservation:sendReviewForm')->hourly();
        $schedule->command('reservation:cancel_after_2_hours')->hourlyAt(15);
        // Cancel expired ad and send mails if necesary
        $schedule->command('ad:cancelexpired')->hourlyAt(30);
        // For presentation purpose, we can run command every 10 min / everyFiveMinutes()
        // $schedule->command('ad:cancelexpired')->everyTenMinutes();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
