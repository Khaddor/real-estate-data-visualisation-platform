<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;

use App\Entity\PrixMoyenParMois;


class PrixMoyenTest extends ApiTestCase
{
    public function testGetPrixMoyenTest(): void
    {
        
        $client = static::createClient();
        $response = $client->request('GET', 'https://localhost/prix_moyen_par_mois', [
            'headers' => [
                'Content-Type' => 'application/json',
            ],
        ]);

        // Assert that the response is successful
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertStringContainsString('date', $response->getContent());
    }

}