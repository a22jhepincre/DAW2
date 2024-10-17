<?php

namespace Database\Seeders;

use App\Models\Plan;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
//
//        User::factory()->create([
//            'name' => 'Test User',
//            'email' => 'test@example.com',
//        ]);

        $plans = [
            [
                'name' => 'Basic Plan',
                'slug' => 'basic-plan',
                'description' => 'The Basic plan is perfect for individuals who are getting started.',
                'price' => 9.99,
                'billing_cycle' => 'monthly',
                'categories' => 5,
                'note_limit_by_category' => 50,
                'collaboration' => false,
                'file_attachments' => false,
                'priority_support' => false,
                'features' => json_encode([
                    'Basic note-taking',
                    'Access from any device'
                ]),
            ],
            [
                'name' => 'Pro Plan',
                'slug' => 'pro-plan',
                'description' => 'The Pro plan offers additional features for more advanced users.',
                'price' => 19.99,
                'billing_cycle' => 'monthly',
                'categories' => 10,
                'note_limit_by_category' => 100,
                'collaboration' => true,
                'file_attachments' => true,
                'priority_support' => false,
                'features' => json_encode([
                    'Collaboration with other users',
                    'File attachments',
                    'Basic note management'
                ]),
            ],
            [
                'name' => 'Business Plan',
                'slug' => 'business-plan',
                'description' => 'The Business plan is designed for teams and businesses.',
                'price' => 49.99,
                'billing_cycle' => 'monthly',
                'categories' => 50,
                'note_limit_by_category' => 500,
                'collaboration' => true,
                'file_attachments' => true,
                'priority_support' => true,
                'features' => json_encode([
                    'Advanced collaboration features',
                    'Priority support',
                    'Unlimited file storage'
                ]),
            ],
            [
                'name' => 'Enterprise Plan',
                'slug' => 'enterprise-plan',
                'description' => 'The Enterprise plan provides the highest level of service for large organizations.',
                'price' => 199.99,
                'billing_cycle' => 'yearly',
                'categories' => null, // Unlimited
                'note_limit_by_category' => null, // Unlimited
                'collaboration' => true,
                'file_attachments' => true,
                'priority_support' => true,
                'features' => json_encode([
                    'Unlimited categories and notes',
                    'Dedicated account manager',
                    'Custom integrations',
                    'Enterprise-grade security'
                ]),
            ]
        ];

        foreach ($plans as $plan) {
            Plan::create($plan);
        }

    }
}
