namespace TreehouseDefense
{
    class ShotgunTower : Tower
    {
        protected override int Power => 2;
        protected override double Accuracy => .5;
      
        public ShotgunTower(MapLocation location) : base(location)
        {
        }
    }
}