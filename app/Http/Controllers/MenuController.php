<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    /**
     * Render the Menu page with custom branded placeholders.
     */
    public function index(): Response
    {
        $menuItems = [
            [
                'id' => 1,
                'name' => 'Boba Milk Tea',
                'category' => 'Milk Tea',
                'price' => 'Rp 19.000',
                'image' => '/menu/boba-milktea.webp'
            ],
            [
                'id' => 2,
                'name' => 'Boba Pudding Milk Tea',
                'category' => 'Milk Tea',
                'price' => 'Rp 22.000',
                'image' => '/menu/boba-pudding-milk-tea.webp'
            ],
            [
                'id' => 3,
                'name' => 'Boom Milk Tea',
                'category' => 'Milk Tea',
                'price' => 'Rp 18.000',
                'image' => '/menu/boom-milk.webp'
            ],
            [
                'id' => 4,
                'name' => 'Brown Sugar Boba Jumbo Ice Cream',
                'category' => 'Ice Cream & Sundae',
                'price' => 'Rp 15.000',
                'image' => '/menu/brown-sugar-boba-JIC-1024x1024.webp'
            ],
            [
                'id' => 5,
                'name' => 'Brown Sugar Boba Sundae',
                'category' => 'Ice Cream & Sundae',
                'price' => 'Rp 16.000',
                'image' => '/menu/brown-sugar-boba-sundae.webp'
            ],
            [
                'id' => 6,
                'name' => 'Chocolate Egg Waffle',
                'category' => 'Egg Waffle',
                'price' => 'Rp 16.000',
                'image' => '/menu/choco-egg-waffle-1024x1024.webp'
            ],
            [
                'id' => 7,
                'name' => 'Chocolate Fiesta Sundae',
                'category' => 'Ice Cream & Sundae',
                'price' => 'Rp 16.000',
                'image' => '/menu/choco-fiesta-sundae.webp'
            ],
            [
                'id' => 8,
                'name' => 'Chocolate Ice Cream Milk Tea Premium',
                'category' => 'Milk Tea',
                'price' => 'Rp 21.000',
                'image' => '/menu/choco-ice-cream-milk-tea-1024x1024.webp'
            ],
            [
                'id' => 9,
                'name' => 'Chocolate Ice Cream Milk Tea',
                'category' => 'Milk Tea',
                'price' => 'Rp 20.000',
                'image' => '/menu/choco-ice-cream-milk-tea.webp'
            ],
            [
                'id' => 10,
                'name' => 'Chocolate Jumbo Ice Cream',
                'category' => 'Ice Cream & Sundae',
                'price' => 'Rp 12.000',
                'image' => '/menu/choco-jumbo-ice-cream-1024x1024.webp'
            ],
            [
                'id' => 11,
                'name' => 'Chocolate Sundae',
                'category' => 'Ice Cream & Sundae',
                'price' => 'Rp 14.000',
                'image' => '/menu/choco-sundae-1024x1024.webp'
            ],
            [
                'id' => 12,
                'name' => 'Chocolate Ice Cream Cone',
                'category' => 'Ice Cream & Sundae',
                'price' => 'Rp 8.000',
                'image' => '/menu/chocolate-ice-cream-cone-1024x1024.webp'
            ],
            [
                'id' => 13,
                'name' => 'Brown Sugar Milk Tea',
                'category' => 'Milk Tea',
                'price' => 'Rp 18.000',
                'image' => '/menu/gula-milktea.webp'
            ],
            [
                'id' => 14,
                'name' => 'Jumbo Milk Tea',
                'category' => 'Milk Tea',
                'price' => 'Rp 22.000',
                'image' => '/menu/jumbo-milk-tea.webp'
            ],
            [
                'id' => 15,
                'name' => 'Fresh Lemon Black Tea',
                'category' => 'Fruit Tea',
                'price' => 'Rp 14.000',
                'image' => '/menu/lemon-black-tea-1024x1024.webp'
            ],
            [
                'id' => 16,
                'name' => 'Signature Lemonade',
                'category' => 'Fruit Tea',
                'price' => 'Rp 10.000',
                'image' => '/menu/lemonade-1024x1024.webp'
            ],
            [
                'id' => 17,
                'name' => 'Mango Egg Waffle',
                'category' => 'Egg Waffle',
                'price' => 'Rp 18.000',
                'image' => '/menu/mango-egg-waffle-1024x1024.webp'
            ],
            [
                'id' => 18,
                'name' => 'Mango Sundae',
                'category' => 'Ice Cream & Sundae',
                'price' => 'Rp 16.000',
                'image' => '/menu/mango-sundae-1024x1024.webp'
            ],
            [
                'id' => 19,
                'name' => 'Matcha Fiesta Sundae',
                'category' => 'Ice Cream & Sundae',
                'price' => 'Rp 16.000',
                'image' => '/menu/matcha-fiesta-sundae-1024x1024.webp'
            ],
            [
                'id' => 20,
                'name' => 'Matcha Soft Serve Cone',
                'category' => 'Ice Cream & Sundae',
                'price' => 'Rp 8.000',
                'image' => '/menu/matcha-ice-cream-cone-.webp'
            ],
            [
                'id' => 21,
                'name' => 'Oreo Egg Waffle',
                'category' => 'Egg Waffle',
                'price' => 'Rp 16.000',
                'image' => '/menu/oreo-egg-waffle-1024x1024.webp'
            ],
            [
                'id' => 22,
                'name' => 'Oreo Milk Tea',
                'category' => 'Milk Tea',
                'price' => 'Rp 19.000',
                'image' => '/menu/oreo-milktea.webp'
            ],
            [
                'id' => 23,
                'name' => 'Oreo Mountain Jumbo Ice Cream',
                'category' => 'Ice Cream & Sundae',
                'price' => 'Rp 15.000',
                'image' => '/menu/oreo-mountain-JIC-1024x1024.webp'
            ],
            [
                'id' => 24,
                'name' => 'Oreo Sundae',
                'category' => 'Ice Cream & Sundae',
                'price' => 'Rp 14.000',
                'image' => '/menu/oreo-sundae-1024x1024.webp'
            ],
            [
                'id' => 25,
                'name' => 'Original Egg Waffle',
                'category' => 'Egg Waffle',
                'price' => 'Rp 14.000',
                'image' => '/menu/original-egg-waffle-1024x1024.webp'
            ],
            [
                'id' => 26,
                'name' => 'Passion Crystal Fruit Tea',
                'category' => 'Fruit Tea',
                'price' => 'Rp 22.000',
                'image' => '/menu/passion-crystal-boom-1024x1024.webp'
            ],
            [
                'id' => 27,
                'name' => 'Peach Jumbo Ice Cream',
                'category' => 'Ice Cream & Sundae',
                'price' => 'Rp 15.000',
                'image' => '/menu/peach-JIC-1024x1024.webp'
            ],
            [
                'id' => 28,
                'name' => 'Peach Strawberry Crystal Tea',
                'category' => 'Fruit Tea',
                'price' => 'Rp 24.000',
                'image' => '/menu/peach-strawberry-boom-1024x1024.webp'
            ],
            [
                'id' => 29,
                'name' => 'Snow Top Milk Tea',
                'category' => 'Milk Tea',
                'price' => 'Rp 22.000',
                'image' => '/menu/snow-milktea.webp'
            ],
            [
                'id' => 30,
                'name' => 'Snow Top Aren Milk Tea',
                'category' => 'Milk Tea',
                'price' => 'Rp 23.000',
                'image' => '/menu/snow-top-aren-milk-tea-1024x1024.webp'
            ],
            [
                'id' => 31,
                'name' => 'Strawberry Egg Waffle',
                'category' => 'Egg Waffle',
                'price' => 'Rp 18.000',
                'image' => '/menu/strawberry-egg-waffle-1024x1024.webp'
            ],
            [
                'id' => 32,
                'name' => 'Strawberry Fiesta Sundae',
                'category' => 'Ice Cream & Sundae',
                'price' => 'Rp 16.000',
                'image' => '/menu/strawberry-fiesta-sundae-1024x1024.webp'
            ],
            [
                'id' => 33,
                'name' => 'Strawberry Jasmine Fruit Tea',
                'category' => 'Fruit Tea',
                'price' => 'Rp 20.000',
                'image' => '/menu/strawberry-jasmine-1024x1024.webp'
            ],
            [
                'id' => 34,
                'name' => 'Vanilla Soft Serve Cone',
                'category' => 'Ice Cream & Sundae',
                'price' => 'Rp 8.000',
                'image' => '/menu/vanilla-ice-cream-cone.webp'
            ],
            [
                'id' => 35,
                'name' => 'YoFlip Gula Aren',
                'category' => 'Specialty/YoFlip',
                'price' => 'Rp 25.000',
                'image' => '/menu/yoflip-gula-aren-1024x1024.webp'
            ],
            [
                'id' => 36,
                'name' => 'YoFlip Oreo Crumble',
                'category' => 'Specialty/YoFlip',
                'price' => 'Rp 25.000',
                'image' => '/menu/yoflip-oreo-1024x1024.webp'
            ],
            [
                'id' => 37,
                'name' => 'YoFlip Sweet Peach',
                'category' => 'Specialty/YoFlip',
                'price' => 'Rp 25.000',
                'image' => '/menu/yoflip-peach-1024x1024.webp'
            ]
        ];

        return Inertia::render('Menu', [
            'menuItems' => $menuItems
        ]);
    }
}
