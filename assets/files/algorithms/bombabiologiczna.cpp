#include <cstdio>
#include <vector>
#include <algorithm>

struct Occurrence {
  int preceeding{0};
  long long index{0};
};

struct Bomb {
  long long x;
  long long r;
};

int right_count_bin_search(const std::vector<Occurrence> &occurrences, long long index) {
  /* O(log n) */
  auto it = std::lower_bound(
      occurrences.rbegin(), occurrences.rend(), index,
      [](const auto &occ, long long index) { return occ.index > index; });

  if (it != occurrences.rend()) {
    return it->preceeding + 1;
  }
  return 0;
}

int left_count_bin_search(const std::vector<Occurrence> &occurrences,
                          long long index) {
  /* O(log n) */
  auto it = std::lower_bound(
      occurrences.begin(), occurrences.end(), index,
      [](const auto &occ, long long index) { return occ.index < index; });

  if (it != occurrences.end()) {
    return it->preceeding;
  }
  return 0;
}

int main () {
  std::vector<Occurrence> occurrences;
  occurrences.reserve(1e5);

	int n, m;
	scanf("%d %d", &n, &m);

  Bomb bombs[n];
  long long cities[m];
  long long min_city, max_city;

	for (int i = 0; i < n; i++)
		scanf("%lld %lld", &bombs[i].x, &bombs[i].r);

	for (int i = 0; i < m; i++)
		scanf("%lld", &cities[i]);

  std::sort(cities, cities + m);
  min_city = cities[0];
  max_city = cities[m - 1];
  for (int i = 0; i < m; i++) {
    int sum = i + 1;
    occurrences.emplace_back(Occurrence{sum, cities[i]});
  }
  occurrences.emplace_back(Occurrence{m, 1000000001});

  for (const auto &bomb : bombs) {
    if (bomb.x + bomb.r < min_city || bomb.x - bomb.r > max_city)
      printf("0\n");
    else {
      int right = right_count_bin_search(occurrences, bomb.x + bomb.r);
      int left = left_count_bin_search(occurrences, bomb.x - bomb.r);
      printf("%d\n", std::max(0, right - left));
    }
  }

	return 0;
}
