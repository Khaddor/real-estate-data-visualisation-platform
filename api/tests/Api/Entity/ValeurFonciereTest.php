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
}