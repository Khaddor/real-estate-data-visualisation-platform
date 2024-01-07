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

}