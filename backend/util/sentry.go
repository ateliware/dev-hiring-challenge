package util

import (
	"github.com/getsentry/sentry-go"
	sentrygin "github.com/getsentry/sentry-go/gin"
	"github.com/gin-gonic/gin"
)

// GravarErroNoSentry é a função responsável por gravar um erro inesperado da aplicação.
func GravarErroNoSentry(err error, c *gin.Context) {

	if c != nil {
		if hub := sentrygin.GetHubFromContext(c); hub != nil {
			hub.Scope().SetUser(sentry.User{
				IPAddress: c.ClientIP(),
			})
			hub.Scope().SetRequest(c.Request)
			hub.CaptureException(err)
			return
		}
	}

	sentry.CaptureException(err)
}
