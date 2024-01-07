<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;

use App\Entity\NombreVenteRegion;


class NombreVenteRegionTest extends ApiTestCase
{
    public function testGetRequest()
    {
        // Create a client and send a GET request to the API
        $client = static::createClient();
        // create the get request
        $response = $client->request('GET', 'https://localhost/ventes_par_region/2022', [
            'headers' => ['accept' => 'application/json']
        ]);
        // Assert that the response is successful
        $this->assertEquals(200, $response->getStatusCode());
        // Assert that the response is in JSON
        $this->assertStringContainsString('application/json', $response->getHeaders()['content-type'][0]);
        // Assert that the response contains the expected properties
        $this->assertStringContainsString('region', $response->getContent());
        $this->assertStringContainsString('nombreVente', $response->getContent());
    }
}