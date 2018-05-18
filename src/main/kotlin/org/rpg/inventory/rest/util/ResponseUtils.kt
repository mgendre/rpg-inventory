package org.rpg.inventory.rest.util

import org.apache.commons.io.IOUtils
import javax.servlet.http.HttpServletResponse


class ResponseUtils {
  companion object {
    fun writeData(response: HttpServletResponse, content: ByteArray, contentType: String) {
      response.setHeader("content-type", contentType)
      response.setHeader("content-length", content.size.toString())
      IOUtils.write(content, response.outputStream)
    }
  }

}
