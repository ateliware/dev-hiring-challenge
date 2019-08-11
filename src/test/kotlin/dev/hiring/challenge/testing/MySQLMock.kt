package dev.hiring.challenge.testing

import com.wix.mysql.EmbeddedMysql
import com.wix.mysql.Sources
import com.wix.mysql.config.MysqldConfig
import com.wix.mysql.distribution.Version

class MySQLMock {

    private lateinit var mysql: EmbeddedMysql

    private val config = MysqldConfig.aMysqldConfig(Version.v5_7_19)
            .withUser("repos", "repos")
            .build()

    fun start() = this.apply {
        mysql = EmbeddedMysql
                .anEmbeddedMysql(config)
                .addSchema("repos")
                .start()
    }

    fun stop() = mysql.stop()

    fun clean() {
        mysql.executeScripts("repos", Sources.fromString("TRUNCATE TABLE repos;"))
    }
}
