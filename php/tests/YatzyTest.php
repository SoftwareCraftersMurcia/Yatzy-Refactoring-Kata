<?php

declare(strict_types=1);

namespace Yatzy\Tests;

use PHPUnit\Framework\TestCase;
use Yatzy\Yatzy;

final class YatzyTest extends TestCase
{
    public function test_chance_scores_sum_of_all_dice(): void
    {
        self::assertSame(15, Yatzy::chance([2, 3, 4, 5, 1]));
        self::assertSame(16, Yatzy::chance([3, 3, 4, 5, 1]));
    }

    public function test_yatzy_scores_50(): void
    {
        self::assertSame(50, Yatzy::yatzyScore([4, 4, 4, 4, 4]));
        self::assertSame(50, Yatzy::yatzyScore([6, 6, 6, 6, 6]));
        self::assertSame(0, Yatzy::yatzyScore([6, 6, 6, 6, 3]));
    }

    public function test_ones(): void
    {
        self::assertSame(1, Yatzy::ones([1, 2, 3, 4, 5]));
        self::assertSame(2, Yatzy::ones([1, 2, 1, 4, 5]));
        self::assertSame(0, Yatzy::ones([6, 2, 2, 4, 5]));
        self::assertSame(4, Yatzy::ones([1, 2, 1, 1, 1]));
    }

    public function test_twos(): void
    {
        self::assertSame(4, Yatzy::twos([1, 2, 3, 2, 6]));
        self::assertSame(10, Yatzy::twos([2, 2, 2, 2, 2]));
    }

    public function test_threes(): void
    {
        self::assertSame(6, Yatzy::threes([1, 2, 3, 2, 3]));
        self::assertSame(12, Yatzy::threes([2, 3, 3, 3, 3]));
    }

    public function test_fours(): void
    {
        self::assertSame(12, Yatzy::fours([4, 4, 4, 5, 5]));
        self::assertSame(8, Yatzy::fours([4, 4, 5, 5, 5]));
        self::assertSame(4, Yatzy::fours([4, 5, 5, 5, 5]));
    }

    public function test_fives(): void
    {
        self::assertSame(10, Yatzy::fives([4, 4, 4, 5, 5]));
        self::assertSame(15, Yatzy::fives([4, 4, 5, 5, 5]));
        self::assertSame(20, Yatzy::fives([4, 5, 5, 5, 5]));
    }

    public function test_sixes(): void
    {
        self::assertSame(0, Yatzy::sixes([4, 4, 4, 5, 5]));
        self::assertSame(6, Yatzy::sixes([4, 4, 6, 5, 5]));
        self::assertSame(18, Yatzy::sixes([6, 5, 6, 6, 5]));
    }

    public function test_one_pair(): void
    {
        self::assertSame(6,  Yatzy::scorePair([3, 4, 3, 5, 6]));
        self::assertSame(10, Yatzy::scorePair([5, 3, 3, 3, 5]));
        self::assertSame(12, Yatzy::scorePair([5, 3, 6, 6, 5]));
    }

    public function test_two_pair(): void
    {
        self::assertSame(16, Yatzy::twoPair(3, 3, 5, 4, 5));
        self::assertSame(18, Yatzy::twoPair(3, 3, 6, 6, 6));
        self::assertSame(0, Yatzy::twoPair(3, 3, 6, 5, 4));
    }

    public function test_three_of_a_kind(): void
    {
        self::assertSame(9, Yatzy::threeOfAKind(3, 3, 3, 4, 5));
        self::assertSame(15, Yatzy::threeOfAKind(5, 3, 5, 4, 5));
        self::assertSame(9, Yatzy::threeOfAKind(3, 3, 3, 2, 1));
    }

    public function test_small_straight(): void
    {
        self::assertSame(15, Yatzy::smallStraight(1, 2, 3, 4, 5));
        self::assertSame(15, Yatzy::smallStraight(2, 3, 4, 5, 1));
        self::assertSame(0, Yatzy::smallStraight(1, 2, 2, 4, 5));
    }

    public function test_large_straight(): void
    {
        self::assertSame(20, Yatzy::largeStraight(6, 2, 3, 4, 5));
        self::assertSame(20, Yatzy::largeStraight(2, 3, 4, 5, 6));
        self::assertSame(0, Yatzy::largeStraight(1, 2, 2, 4, 5));
    }

    public function test_full_house(): void
    {
        self::assertSame(18, Yatzy::fullHouse(6, 2, 2, 2, 6));
        self::assertSame(0, Yatzy::fullHouse(2, 3, 4, 5, 6));
    }
}
