namespace TreehouseDefense
{
    class LaserTower : Tower
    {
        protected override double Accuracy => .9;
      
        public LaserTower(MapLocation location) : base(location)
        {
        }
    }
}