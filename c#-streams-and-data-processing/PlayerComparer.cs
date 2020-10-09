using System.Collections.Generic;

namespace SoccerStats
{
    public class PlayerComparer : IComparer<Player>
    {
        public int Compare(Player x, Player y)
        {
            return y.PointsPerGame.CompareTo(x.PointsPerGame);
        }
    }
}