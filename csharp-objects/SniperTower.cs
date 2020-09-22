namespace TreehouseDefense
{
    class SniperTower : Tower
    {
        protected override int Range => 2;
      
        public SniperTower(MapLocation location) : base(location)
        {
        }
    }
}