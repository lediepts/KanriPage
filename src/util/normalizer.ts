// 半角記号、半角英数字のコードポイント
// 0020		!	"	#	$	%	&	'	(	)	*	+	,	-	.	/
// 0030	0	1	2	3	4	5	6	7	8	9	:	;	<	=	>	?
// 0040	@	A	B	C	D	E	F	G	H	I	J	K	L	M	N	O
// 0050	P	Q	R	S	T	U	V	W	X	Y	Z	[	\	]	^	_
// 0060	`	a	b	c	d	e	f	g	h	i	j	k	l	m	n	o
// 0070	p	q	r	s	t	u	v	w	x	y	z	{	|	}	~

// 全角記号、全角英数字のコードポイント
// FF00	＀	！	＂	＃	＄	％	＆	＇	（	）	＊	＋	，	－	．	／
// FF10	０	１	２	３	４	５	６	７	８	９	：	；	＜	＝	＞	？
// FF20	＠	Ａ	Ｂ	Ｃ	Ｄ	Ｅ	Ｆ	Ｇ	Ｈ	Ｉ	Ｊ	Ｋ	Ｌ	Ｍ	Ｎ	Ｏ
// FF30	Ｐ	Ｑ	Ｒ	Ｓ	Ｔ	Ｕ	Ｖ	Ｗ	Ｘ	Ｙ	Ｚ	［	＼	］	＾	＿
// FF40	｀	ａ	ｂ	ｃ	ｄ	ｅ	ｆ	ｇ	ｈ	ｉ	ｊ	ｋ	ｌ	ｍ	ｎ	ｏ
// FF50	ｐ	ｑ	ｒ	ｓ	ｔ	ｕ	ｖ	ｗ	ｘ	ｙ	ｚ	｛	｜	｝	～

/**
 * 半角英数字に変換可能な文字は変換し、それ以外はそのまま残す
 *
 * @param str 文字列
 */
export function normalizeToHalf(str: string): string {
  return str
    .replace('　', ' ')
    .replace(/[！-／０-９：-＠Ａ-Ｚ［-｀ａ-ｚ｛-～]/g, s =>
      String.fromCodePoint(s.codePointAt(0)! - 0xfee0),
    )
}

/**
 * 半角英数字のみを残す
 *
 * @param str 文字列
 */
export function limitToHalfAlphaNum(str: string): string {
  return str.replace(/[^0-9A-Za-z]/g, '')
}

/**
 * 0以上の整数かどうかの判定
 * @param str
 */
export function isNum(str: string): boolean {
  const regexp = new RegExp(/^[0-9]+(\.[0-9]+)?$/)
  return regexp.test(str)
}

export function isHalfwidthAlphanum(str: string): boolean {
  const regexp = new RegExp(/^[0-9a-zA-Z]+$/)
  return regexp.test(str)
}
