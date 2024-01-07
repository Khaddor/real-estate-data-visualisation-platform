<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;


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
      

        // Asserts that the response is a success
        $this->assertResponseIsSuccessful();
       
        // Asserts that the response has the correct JSON structure
        $this->assertJson($response->getContent());

        // Decode the JSON response
        $data = json_decode($response->getContent(), true);

        // Assert that the decoded data is an array
        $this->assertIsArray($data);


    
        

       

    }
}