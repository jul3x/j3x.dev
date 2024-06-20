#include <cstdio>
#include <cmath>

int main () {
  int n, h, x;
  long double f, t;

  scanf("%d", &x);

  for (int i = 0; i < x; i++) {
    scanf("%d %d %Lf", &h, &n, &f);
    t = sqrt(2.0 * (long double)h / 9.81);

    for (int j = 1; j < n; j++) 
      t += 2 * sqrt(2.0 * (long double)h * pow((long double)(1-f), (long double)(j)) / 9.81);	
  
    printf("%.4Lf\n", t);	
  }
  
  return 0;
}
