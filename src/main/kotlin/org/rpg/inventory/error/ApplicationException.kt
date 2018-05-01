package org.rpg.inventory.error

open class ApplicationException : RuntimeException {
  constructor(name: String) : super(name)
  constructor(exception: Exception) : super(exception)
  constructor(name: String, exception: Exception) : super(name, exception)
}
