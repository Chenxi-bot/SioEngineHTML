@loadcell
@wait time=1000
@loop
;
@macro name=copyone
@copy dx=198 dy=115 sx=%x sy=0 sw=129 sh=57
@wait time=30
@endmacro
;
*start
@copyone x=0
@copyone x=129
@copyone x=258
@copyone x=129
@copyone x=0
@wait time=6000

@jump target=*start
