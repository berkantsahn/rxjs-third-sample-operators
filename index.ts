import { filter, first, from, last, map, of, pluck, take } from 'rxjs';

from(['Mercedes', 'Audi']).subscribe((data) => console.log(data));
of('BMW', 'Ford').subscribe((data) => console.log(data));

// sayının çift olup olmadığına göre true - false değeri döndürmeyi map işlemi ile yapabiliriz
// from([1, 5, 8, 9, 16])
//   .pipe(map((n) => n % 2 == 0
//   .subscribe((data) => console.log(data));

// veya filtreleme işlemi yapılarak çift sayıların hepsini, belirli bir kısmını, ilk ve son elemanı
// çağırma işlemi gibi işlemler yapabiliriz
from([1, 5, 8, 9, 16])
  .pipe(
    filter((n) => n % 2 == 0),
    first()
  )
  .subscribe((data) => console.log(data));

from([1, 5, 8, 9, 16])
  .pipe(
    filter((n) => n % 2 == 0),
    last()
  )
  .subscribe((data) => console.log(data));

from([1, 5, 8, 9, 16])
  .pipe(
    filter((n) => n % 2 == 0),
    take(1)
  )
  .subscribe((data) => console.log(data));

// veya alttaki gibi next, err değerleri yazdırabiliriz
from([1, 5, 8, 9, 16])
  .pipe(last((n) => n % 16 == 0))
  .subscribe({
    next: (data) => console.log(data),
    error: (err) => console.log(err.message),
  });

// veya bir değer bulamazsa default değer gönderebiliriz
// bizim default değerimiz bu örnekte 0 olacak
from([1, 5, 8, 9, 16])
  .pipe(last((n) => n % 6 == 0, 0))
  .subscribe({
    next: (data) => console.log(data),
    error: (err) => console.log(err.message),
  });

// veritabanından gelen bir bilgi üzerinde istenilen kolonlar aşağıdaki gibi
// kolayca seçilebilir
from([
  { name: 'iPhone 12', price: 23000 },
  { name: 'iPhone 13', price: 25000 },
  { name: 'iPhone 14', price: 29000 },
])
  .pipe(pluck('name'))
  .subscribe({
    next: (data) => console.log(data),
    error: (err) => console.log(err),
  });

// yukarıdaki örneği filter aracıyla filtreleme işlemi de yapabilir, pluck yerine map
// kullanabiliriz (pluck rxjs 8 ve üstünde desteklenmemektedir)
from([
  { name: 'iPhone 12', price: 23000 },
  { name: 'iPhone 13', price: 25000 },
  { name: 'iPhone 14', price: 29000 },
])
  .pipe(
    filter((p) => p.price > 24999),
    map((p) => p.name)
  )
  .subscribe({
    next: (data) => console.log(data),
    error: (err) => console.log(err),
  });
