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
        $this->assertStringContainsString('application/ld+json', $response->getHeaders()['content-type'][0]);
        $this->assertStringContainsString('prixMoyen', $response->getContent());
    }

    public function testGettersAndSetters()
    {
        // Create an instance of the AveragePricePerMonth class
        $prixMoyenParMois = new PrixMoyenParMois();

        // Set the date and average price using the setters
        $date = new \DateTime();
        $prix = 3949.143;
        $prixMoyenParMois->setDate($date);
        $prixMoyenParMois->setPrixMoyen($prix);

        // Verify that the getters return the correct values
        $this->assertEquals($date, $prixMoyenParMois->getDate());
        $this->assertEquals($prix, $prixMoyenParMois->getPrixMoyen());
    }

}