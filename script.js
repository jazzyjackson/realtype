function extractType(anyInput){
	return Object.prototype.toString.call(anyInput).slice(8, -1)
	// return anyInput.constructor.name // this might be what you want
}

module.exports = class Type {
	/*
		5 -> Number
		"" -> String
		true -> Boolean
		{Object} -> Boolean
		["",NaN,null] -> Array
		null -> null
		undefined -> undefined

	*/
	constructor(anything){
		/* whoops, global["Null"] returns undefined because null has no constructor,
		   but global["undefined"] returns undefined for the same reason.
		   Need to explicitly match against null */
		this.identity = Object.is(anything, null)
			? null
			: global[extractType(anything)]
	}

	static from(anything){
		return new Type(anything)
	}

	static register(schema){
		// Maybe eventually register JSON schema with which to compare an object with
		// To return what schema a particular object matches
	}

	valueOf(){
		return this.identity
	}

	is(typeInput){
		return typeInput === this.identity
	}

	isNot(typeInput){
		return typeInput !== this.identity
	}

	isOneOf(){
		return Array.from(arguments).some(test => test === this.identity)
	}

	isNotOneOf(){
		return Array.from(arguments).every(test => test !== this.identity)
	}

	toString(){
		return extractType(this.identity)
	}
}
