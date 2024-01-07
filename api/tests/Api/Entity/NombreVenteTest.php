<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;

use App\Entity\NombreVente;


class NombreVenteTest extends ApiTestCase
{
    public function testGettersAndSetters()
    {
        // Create an instance of the NumberSalesByDate class
        $numberSalesByDate = new NombreVente();

        // Set the date and number of sales using the setters
        $date = new \DateTime();
        $numberSales = 123;
        $numberSalesByDate->setDate($date);
        $numberSalesByDate->setNombreVente($numberSales);

        // Verify that the getters return the correct values
        $this->assertEquals($date, $numberSalesByDate->getDate());
        $this->assertEquals($numberSales, $numberSalesByDate->getNombreVente());
    }


    public function testGetRequest()
    {
        // Create a client and send a GET request to the API
        $client = static::createClient();
        // create the get request
        $response = $client->request('GET', 'https://localhost/nombreVentes/mois/2022-01-01/2022-12-25', [
            'headers' => ['accept' => 'application/json']
        ]);
        // Assert that the response is successful
        $this->assertEquals(200, $response->getStatusCode());
        // Assert that the response is in JSON
        $this->assertStringContainsString('application/json', $response->getHeaders()['content-type'][0]);
        // Assert that the response contains the expected properties
        $this->assertStringContainsString('date', $response->getContent());
        $this->assertStringContainsString('nombreVente', $response->getContent());
    }

}