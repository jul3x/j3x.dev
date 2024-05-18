#include <cstdio>

typedef long long ll;

long long power_modulo_fast(ll a, ll b, ll mod) {
   ll i, result = 1, x = a%mod;

   for (i=1; i<=b; i<<=1) {
      x %= mod;
      if ((b&i) != 0) {
         result *= x;
         result %= mod;
      }
      x *= x;
   }

   return result;
}

ll silnia[1000002];

int main () {
	int t, n, k;
	ll wyn = 0;
	silnia[1] = 1;
	for (ll i = 2; i <= 1000001; i++)
		silnia[i] = (silnia[i-1]*i)%1000000007;
	
	scanf ("%d", &t)?:0;
	
	for (int i = 0; i < t; i++) {
		scanf ("%d %d", &n, &k)?:0;
		if (n > k + 1)
			printf ("0\n");
		else if (n == k+1)
			printf ("1\n");
		else printf ("%lld\n", ((silnia[k+1] * power_modulo_fast(silnia[k-n+1], 1000000005, 1000000007))%1000000007 * power_modulo_fast(silnia[n], 1000000005, 1000000007))%1000000007);
	}
	
	return 0;
}
