package org.rpg.inventory.error

class DataNotFoundException : ApplicationException {
  constructor(name: String) : super(name)
  constructor(exception: Exception) : super(exception)
  constructor(name: String, exception: Exception) : super(name, exception)
}
