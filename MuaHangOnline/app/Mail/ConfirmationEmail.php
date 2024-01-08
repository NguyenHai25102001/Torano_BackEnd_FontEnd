<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ConfirmationEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;


    /**
     * Create a new message instance.
     *
     * @param $user
     */
    public function __construct($user)
    {

        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->subject('Confirmation Email')
            ->view('emails.confirmation'); // You should have a "confirmation.blade.php" view file in the "resources/views/emails" directory
    }
}
