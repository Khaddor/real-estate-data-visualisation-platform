<?php
use PHPUnit\Framework\TestCase;
use App\State\PrixMoyenParMoisProvider;
use App\Entity\PrixMoyenParMois;
use ApiPlatform\Metadata\Operation;
use App\Repository\ValeurFonciereRepository;

class PrixMoyenParMoisProviderTest extends TestCase
{
    public function testProvide()
    {
        // Create a mock repository
        $repository = $this->createMock(ValeurFonciereRepository::class);

        // Set up the mock repository to return some test data when findByAveragePricePerMonth() is called
        $repository->expects($this->once())
            ->method('findByAveragePricePerMonth')
            ->willReturn([
                ['date' => '2018-10', 'averagePrice' => 3802.79],
                ['date' => '2018-11', 'averagePrice' => 3803.77],
            ]);

        // Create an instance of the provider and call the provide() method
        $provider = new PrixMoyenParMoisProvider($repository);
        $operation = $this->createMock(Operation::class);
        $items = $provider->provide($operation);

        // Assert that the returned data is as expected
        $this->assertCount(2, $items);
        $this->assertContainsOnlyInstancesOf(PrixMoyenParMois::class, $items);

        // Iterate through items and convert the date strings to DateTime objects
        foreach ($items as $item) {
            $this->assertInstanceOf(\DateTime::class, $item->getDate());
        }

        // Additional assertions for data validation
        $this->assertEquals('2018-10', $items[0]->getDate()->format('Y-m'));
        $this->assertEquals(3802.79, $items[0]->getPrixMoyen());
        $this->assertEquals(3803.77, $items[1]->getPrixMoyen());
    }
}
