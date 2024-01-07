<?php
use PHPUnit\Framework\TestCase;
use App\State\NombredeVenteProvider;
use App\Entity\NombreVente;
use ApiPlatform\Metadata\Operation;
use App\Repository\ValeurFonciereRepository;

class NombredeVenteProviderTest extends TestCase
{
    public function testProvide()
{
    // Create a mock repository
    $repository = $this->createMock(ValeurFonciereRepository::class);

    $repository->expects($this->once())
        ->method('findNombreVenteParDate')
        ->with('mois', '2023-01-01', '2023-12-31')
        ->willReturn([
            ['date' => '2023-01', 'nombreVente' => 37180],
            ['date' => '2023-02', 'nombreVente' => 35679],
        ]);

    // Create an instance of the provider and call the provide() method
    $provider = new NombredeVenteProvider($repository);
    $operation = $this->createMock(Operation::class);
    $items = $provider->provide($operation, ['type' => 'mois', 'debut' => '2023-01-01', 'fin' => '2023-12-31']);

    // Assert that the returned data is as expected
    $this->assertCount(2, $items);
    $this->assertContainsOnlyInstancesOf(NombreVente::class, $items);
    
    // Additional assertions for data validation
    $this->assertEquals('2023-01', $items[0]->getDate()->format('Y-m'));
    $this->assertEquals('2023-02', $items[1]->getDate()->format('Y-m'));

    $this->assertEquals(37180, $items[0]->getNombreVente());
    $this->assertEquals(35679, $items[1]->getNombreVente());
}

}
