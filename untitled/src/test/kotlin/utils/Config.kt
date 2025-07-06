package utils

import org.apache.commons.lang3.ObjectUtils
import java.net.Socket

object Config {
    val baseUrl: String = if (isLocalServerRunning())
        "http://localhost:3000"
    else
        "https://api.yavshok.ru"

    private fun isLocalServerRunning(): Boolean {
        return try {
            Socket("localhost", 3000).use { true }
        } catch (e: Exception) {
            false
        }
    }
}