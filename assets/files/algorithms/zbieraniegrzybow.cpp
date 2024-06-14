#include <cstdio>
#include <algorithm>

using namespace std;

long long tab[1000000], sum[1000000], n, t, a, b;

int main () {
	scanf ("%lld", &n);
	for (int i = 0; i < n; i++) scanf ("%lld", &tab[i]);
	sort(tab, tab+n);
	
	for (int i = 0; i < n; i++) {
		if (i == 0) sum[i] = tab[0];
		else sum[i] = tab[i]+sum[i-1];
	}
	
	scanf ("%lld", &t);
	
	for (int i = 0; i < t; i++) {
		scanf ("%lld %lld", &a, &b);
		
		printf ("%lld\n", tab[a - 1] - tab[b - 1]);
	}
	return 0;
}
