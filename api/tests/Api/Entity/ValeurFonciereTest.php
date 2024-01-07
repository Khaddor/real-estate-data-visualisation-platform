<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;

use App\Entity\ValeurFonciere;



class ValeurFonciereTest extends ApiTestCase
{
    public function testGetRequest()
    {
        // Create a client and send a GET request to the API
        $client = static::createClient();
        $response = $client->request('GET', 'https://localhost/valeur_foncieres?page=1', [
            'headers' => ['accept' => 'application/ld+json']
        ]);
        // Assert that the response is successful
        $this->assertEquals(200, $response->getStatusCode());
        // Assert that the response is in JSON
        $this->assertStringContainsString('application/ld+json', $response->getHeaders()['content-type'][0]);
        $this->assertStringContainsString('valeurFonciere', $response->getContent());
        $this->assertStringContainsString('dateMutation', $response->getContent());
        $this->assertStringContainsString('region', $response->getContent());
        $this->assertStringContainsString('surface', $response->getContent());
    }
    

}