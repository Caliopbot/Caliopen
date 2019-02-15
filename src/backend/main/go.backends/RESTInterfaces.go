// Copyleft (ɔ) 2017 The Caliopen contributors.
// Use of this source code is governed by a GNU AFFERO GENERAL PUBLIC
// license (AGPL) that can be found in the LICENSE file.

package backends

import (
	. "github.com/CaliOpen/Caliopen/src/backend/defs/go-objects"
)

type APIStorage interface {
	AttachmentStorage
	CredentialsStorage
	ContactStorage
	DevicesStorage
	DiscussionStorage
	IdentityStorage
	KeysStorage
	MessageStorage
	ParticipantStorage
	TagsStorage
	UserNameStorage
	UserStorage
}

type APIIndex interface {
	MessageIndex
	ContactIndex
	RecipientsSuggest(user *UserInfo, query_string string) (suggests []RecipientSuggestion, err error)
	Search(search IndexSearch) (result *IndexResult, err error)
}

type APICache interface {
	// authentication
	GetAuthToken(token string) (value *Auth_cache, err error)
	LogoutUser(key string) error
	// password reset process
	GetResetPasswordToken(token string) (*TokenSession, error)
	GetResetPasswordSession(user_id string) (*TokenSession, error)
	SetResetPasswordSession(user_id, reset_token string) (*TokenSession, error)
	DeleteResetPasswordSession(user_id string) error
	// Oauth session handling
	SetOauthSession(key string, session *OauthSession) error
	GetOauthSession(key string) (*OauthSession, error)
	DeleteOauthSession(user_id string) error
	// Device validation
	GetDeviceValidationSession(userId, deviceId string) (*TokenSession, error)
	GetTokenValidationSession(userId, token string) (*TokenSession, error)
	SetDeviceValidationSession(userId, deviceId, token string) (*TokenSession, error)
	DeleteDeviceValidationSession(userId, deviceId string) error
}
