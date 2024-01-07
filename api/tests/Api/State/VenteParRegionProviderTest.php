<?php
use PHPUnit\Framework\TestCase;
use App\State\VenteParRegionProvider;
use App\Entity\NombreVenteRegion;
use ApiPlatform\Metadata\Operation;
use App\Repository\ValeurFonciereRepository;

class VenteParRegionProviderTest extends TestCase
{
    public function testProvide()
    {
        // Create a mock repository
        $repository = $this->createMock(ValeurFonciereRepository::class);

        $repository->expects($this->once())
            ->method('findVentesParRegion')
            ->with(2023)
            ->willReturn([
                ['region' => 'Auvergne-Rhône-Alpes', 'nombreVente' => 12345],
                ['region' => 'Normandie', 'nombreVente' => 67890],
            ]);

        // Create an instance of the provider and call the provide() method
        $provider = new VenteParRegionProvider($repository);
        $operation = $this->createMock(Operation::class);
        $items = $provider->provide($operation, ['annee' => 2023]);

        // Assert that the returned data is as expected
        $this->assertCount(2, $items);
        $this->assertContainsOnlyInstancesOf(NombreVenteRegion::class, $items);

        // Additional assertions for data validation
        $this->assertEquals('Auvergne-Rhône-Alpes', $items[0]->getRegion());
        $this->assertEquals(12345, $items[0]->getNombreVente());
        $this->assertEquals('Normandie', $items[1]->getRegion());
        $this->assertEquals(67890, $items[1]->getNombreVente());
    }
}
