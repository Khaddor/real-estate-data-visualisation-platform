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
    
    public function testGettersAndSetters()
    {
        $valeurFonciere = new ValeurFonciere();

        // Create a DateTime object
        $dateMutation = new \DateTime('2024-01-07');
        
        // Test setting and getting the dateMutation property
        $valeurFonciere->setDateMutation($dateMutation);
        $this->assertEquals($dateMutation, $valeurFonciere->getDateMutation());

        // Test setting and getting the typeMutation property
        $valeurFonciere->setTypeMutation('Vente');
        $this->assertEquals('Vente', $valeurFonciere->getTypeMutation());

        // Test setting and getting the valeurFonciere property
        $valeurFonciere->setValeurFonciere(100000.50);
        $this->assertEquals(100000.50, $valeurFonciere->getValeurFonciere());

        // Test setting and getting the region property
        $valeurFonciere->setRegion('Auvergne-Rhône-Alpes');
        $this->assertEquals('Auvergne-Rhône-Alpes', $valeurFonciere->getRegion());

        // Test setting and getting the typeLocal property
        $valeurFonciere->setTypeLocal('Apartment');
        $this->assertEquals('Apartment', $valeurFonciere->getTypeLocal());

        // Test setting and getting the surface property
        $valeurFonciere->setSurface(75);
        $this->assertEquals(75, $valeurFonciere->getSurface());
    }

    public function testPostValidData()
    {
        // Create a client and send a POST request with valid data to the API
        $client = static::createClient();
        $response = $client->request('POST', 'https://localhost/valeur_foncieres', [
            'json' => [
                "dateMutation"=> "2024-01-07T18:11:20.561Z",
                "typeMutation"=> "Vente",
                "valeurFonciere"=> 100000,
                "region"=> "Normandie",
                "typeLocal"=> "Appartement",
                "surface"=> 70
            ],
            'headers' => ['accept' => 'application/ld+json']
        ]);

        // Assert that the response is successful
        $this->assertEquals(201, $response->getStatusCode());
        $this->assertStringContainsString('application/ld+json', $response->getHeaders()['content-type'][0]);
        $this->assertStringContainsString('region', $response->getContent());
    }

    public function testPostInvalidData()
    {
        // Create a client and send a POST request with invalid data to the API
        $client = static::createClient();
        $response = $client->request('POST', 'https://localhost/valeur_foncieres', [
             'json' => [
                // surface is not int
                "dateMutation"=> "2024-01-07T18:11:20.561Z",
                "typeMutation"=> "Vente",
                "valeurFonciere"=> 100000,
                "region"=> "Normandie",
                "surface"=> 70.5
            ],
            'headers' => ['accept' => 'application/ld+json']
        ]);

        // Assert that the response status code indicates a validation error (e.g., 400 Bad Request)
        $this->assertEquals(400, $response->getStatusCode());
    }

    public function testPutUpdateData()
    {
        // Create a client and send a PUT request to update an existing resource
        $client = static::createClient();
        $response = $client->request('PUT', 'https://localhost/valeur_foncieres/1', [
            'json' => [
                "identifiant"=> 1,
                "dateMutation"=> "2023-01-05T00:00:00+00:00",
                "typeMutation"=> "Vente",
                "valeurFonciere"=> 1070000,
                "region"=> "Auvergne-Rhône-Alpes\n",
                "typeLocal"=> "Appartement",
                "surface"=> 235
            ],
            'headers' => ['accept' => 'application/ld+json']
        ]);

        // Assert that the response is successful (e.g., 200 OK)
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertStringContainsString('application/ld+json', $response->getHeaders()['content-type'][0]);
        $this->assertStringContainsString('surface', $response->getContent());
    }

    public function testDeleteRequest()
    {
        // Create a client and send a DELETE request to the API
        $client = static::createClient();
        $response = $client->request('DELETE', 'https://localhost/valeur_foncieres/1', [
            'headers' => ['accept' => 'application/ld+json']
        ]);
        // Assert that the response is successful
        $this->assertEquals(204, $response->getStatusCode());
    }


}