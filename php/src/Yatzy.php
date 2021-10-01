<?php

declare(strict_types=1);

namespace Yatzy;

final class Yatzy
{
    /**
     * @param list<int> $dice
     */
    public static function chance(array $dice): int
    {
        return array_sum($dice);
    }

    /**
     * @param list<int> $dice
     */
    public static function yatzyScore(array $dice): int
    {
        $values = array_count_values($dice);

        return count($values) === 1 ? 50 : 0;
    }

    /**
     * @param list<int> $dice
     */
    public static function ones(array $dice): int
    {
        return self::sumEquals($dice, 1);
    }

    /**
     * @param list<int> $dice
     */
    public static function twos(array $dice): int
    {
        return self::sumEquals($dice, 2);
    }

    /**
     * @param list<int> $dice
     */
    public static function threes(array $dice): int
    {
        return self::sumEquals($dice, 3);
    }

    /**
     * @param list<int> $dice
     */
    public static function fours(array $dice): int
    {
        return self::sumEquals($dice, 4);
    }

    /**
     * @param list<int> $dice
     */
    public static function fives(array $dice): int
    {
        return self::sumEquals($dice, 5);
    }

    /**
     * @param list<int> $dice
     */
    public static function sixes(array $dice): int
    {
        return self::sumEquals($dice, 6);
    }

    /**
     * @param list<int> $dice
     */
    private static function sumEquals(array $dice, int $number): int
    {
        $values = array_count_values($dice);

        $occurrences = $values[$number] ?? 0;

        return $occurrences * $number;
    }

    public static function scorePair($d1, $d2, $d3, $d4, $d5)
    {
        $counts = array_fill(0, 6, 0);
        $counts[$d1 - 1] += 1;
        $counts[$d2 - 1] += 1;
        $counts[$d3 - 1] += 1;
        $counts[$d4 - 1] += 1;
        $counts[$d5 - 1] += 1;
        for ($at = 0; $at != 6; $at++)
            if ($counts[6 - $at - 1] == 2)
                return (6 - $at) * 2;
        return 0;
    }

    public static function twoPair($d1, $d2, $d3, $d4, $d5)
    {
        $counts = array_fill(0, 6, 0);
        $counts[$d1 - 1] += 1;
        $counts[$d2 - 1] += 1;
        $counts[$d3 - 1] += 1;
        $counts[$d4 - 1] += 1;
        $counts[$d5 - 1] += 1;
        $n = 0;
        $score = 0;
        for ($i = 0; $i != 6; $i++)
            if ($counts[6 - $i - 1] >= 2) {
                $n = $n + 1;
                $score += (6 - $i);
            }

        if ($n == 2)
            return $score * 2;
        else
            return 0;
    }

    public static function threeOfAKind($d1, $d2, $d3, $d4, $d5)
    {
        $t = array_fill(0, 6, 0);
        $t[$d1 - 1] += 1;
        $t[$d2 - 1] += 1;
        $t[$d3 - 1] += 1;
        $t[$d4 - 1] += 1;
        $t[$d5 - 1] += 1;
        for ($i = 0; $i != 6; $i++)
            if ($t[$i] >= 3)
                return ($i + 1) * 3;
        return 0;
    }

    public static function smallStraight($d1, $d2, $d3, $d4, $d5)
    {
        $tallies = array_fill(0, 6, 0);
        $tallies[$d1 - 1] += 1;
        $tallies[$d2 - 1] += 1;
        $tallies[$d3 - 1] += 1;
        $tallies[$d4 - 1] += 1;
        $tallies[$d5 - 1] += 1;
        if ($tallies[0] == 1 &&
            $tallies[1] == 1 &&
            $tallies[2] == 1 &&
            $tallies[3] == 1 &&
            $tallies[4] == 1)
            return 15;
        return 0;
    }

    public static function largeStraight($d1, $d2, $d3, $d4, $d5)
    {
        $tallies = array_fill(0, 6, 0);
        $tallies[$d1 - 1] += 1;
        $tallies[$d2 - 1] += 1;
        $tallies[$d3 - 1] += 1;
        $tallies[$d4 - 1] += 1;
        $tallies[$d5 - 1] += 1;
        if ($tallies[1] == 1 &&
            $tallies[2] == 1 &&
            $tallies[3] == 1 &&
            $tallies[4] == 1 &&
            $tallies[5] == 1)
            return 20;
        return 0;
    }

    public static function fullHouse($d1, $d2, $d3, $d4, $d5)
    {
        $tallies = [];
        $_2 = false;
        $i = 0;
        $_2_at = 0;
        $_3 = false;
        $_3_at = 0;

        $tallies = array_fill(0, 6, 0);
        $tallies[$d1 - 1] += 1;
        $tallies[$d2 - 1] += 1;
        $tallies[$d3 - 1] += 1;
        $tallies[$d4 - 1] += 1;
        $tallies[$d5 - 1] += 1;

        foreach (range(0, 5) as $i) {
            if ($tallies[$i] == 2) {
                $_2 = true;
                $_2_at = $i + 1;
            }
        }

        foreach (range(0, 5) as $i) {
            if ($tallies[$i] == 3) {
                $_3 = true;
                $_3_at = $i + 1;
            }
        }

        if ($_2 && $_3)
            return $_2_at * 2 + $_3_at * 3;
        else
            return 0;
    }
}
