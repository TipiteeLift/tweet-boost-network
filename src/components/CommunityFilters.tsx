import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, TrendingUp, Users, Star } from "lucide-react";

interface CommunityFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const CommunityFilters = ({
  searchTerm,
  onSearchChange,
  activeFilter,
  onFilterChange,
}: CommunityFiltersProps) => {
  const filters = [
    { key: "all", label: "All Communities", icon: Filter },
    { key: "joined", label: "Joined", icon: Users },
    { key: "trending", label: "Trending", icon: TrendingUp },
    { key: "featured", label: "Featured", icon: Star },
  ];

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search communities..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.key}
            variant={activeFilter === filter.key ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(filter.key)}
            className="animate-fade-in"
          >
            <filter.icon className="w-4 h-4 mr-2" />
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  );
};