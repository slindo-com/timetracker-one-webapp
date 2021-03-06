import { writable, get } from 'svelte/store';
// import { userStore } from '../stores/user-store.js'

let language = 'en'

export const i18n = writable({
	"MONTHS": [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"Juli",
		"August",
		"September",
		"October",
		"November",
		"December"
	],
	"WEEKDAYS_SHORT": [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat"
	],
	"MAIN_NAV": [
		"Timelog",
		"Reports",
		"Settings"
	],

	"NEW_ENTRY": "New Entry",
	"NO_TITLE": "No title",
	"NO_TASK": "No task",
	"NO_COMMENT": "No comment",
	"STOP_STOPWATCH": "Stop Stopwatch",
	"START_STOPWATCH": "Start Stopwatch",
	"EDIT_DURATION": "Edit Duration",
	"EDIT_TASK": "Edit Task",
	"EDIT_COMMENT": "Edit Comment",
	"DELETE": "Delete",
	"SEARCH_TASKS": "Search Tasks",
	"NO_TASKS_FOUND": "No tasks found for this search term",
	"NO_TRACKED_HOURS": "No tracked hours for this day.",
	"NO_TRACKED_HOURS_DESCRIPTION": "To track some time, please use the button saying \"New Entry\". If you need help how to use Timetracker.One, please",
	"NO_TRACKED_HOURS_LINK": "click here",
	"TOTAL": "total",

	"NO_TIMES_FOR_FILTERS": "There are no times logged for the choosen filters.",
	"TASKS": "Tasks",
	"CURRENT_WEEK": "Current Week",
	"LAST_WEEK": "Last Week",
	"CURRENT_MONTH": "Current Month",
	"LAST_MONTH": "Last Month",
	"CUSTOM": "Custom",
	"WEEK": "Week",
	"UNTIL": "until",

	"USERNAME_UP_TO_DATE": "Username is up to date.",
	"USERNAME_WILL_BE_UPDATED": "Username will be updated…",
	"SIGN_OUT": "Sign Out",
	"YOUR_ACCOUNT": "Your Account",
	"USERNAME": "Username",
	"LANGUAGE": "Language",
	"COLOR": "Color",
	"EDIT_TITLE": "Edit Title",
	"EDIT_COLOR": "Edit Color",
	"NEW_TASK": "New Task",
	"NO_TASKS_CREATED": "No tasks created.",
	"TRACK_TOGETHER": "Want to track togehter?",
	"TRACK_TOGETHER_DESCRIPTION": "You are tracking solo right now. If you like to create a team, please go ahead:",
	"NEW_TEAM_TITLE": "Title of new team",
	"CREATE_NEW_TEAM": "Create New Team",
	"NO_NAME": "No Name",
	"NO_EMAIL": "No email address",
	"ADMIN": "Admin",
	"MEMBER": "Member",
	"NEW_TEAM_GUIDE": "Please provide the e-mail address of the one you'd like to invite. After clicking the button, we will send an invitation to join your team.",
	"EMAIL_OF_NEW_MEMBER": "Email of new member",
	"NAME_OF_NEW_MEMBER": "Name of new member",
	"SEND_INVITATION": "Send Invitation",
	"TEAM": "Team",
	"INVITE_MEMBER": "Invite Member",
	"TEAM_INVITATIONS": "Invitations to the team",
	"ACCOUNT": "Account",
	"SET_NEW_PASSWORD_FOR": "Set password for Timetracker.One",
	"PASSWORD": "Password",
	"SET_NEW_PASSWORD": "Set New Password",
	"NEW_PASSWORD_SET": "New Password is set",
	"GO_TO_SIGN_IN_PAGE": "Go to Sign In Page",
	"LOADING": "Loading…",
	"NEW_PASSWORD_FOR": "New Password for Timetracker.One",
	"GET_NEW_PASSWORD": "Get new password",
	"OR": "or",
	"GO_TO_SIGN_IN_PAGE": "go to sign in page",
	"EMAIL": "Email",
	"SIGN_IN_TO": "Sign In to Timetracker.One",
	"SIGN_IN": "Sign In",
	"CREATE_NEW_ACCOUNT": "create new account",
	"SEND_NEW_PASSWORD": "Send New Password",
	"SIGN_UP_TO_TEAM": "Sign up for team",
	"SIGN_UP_TO_TIMETRACKER_ONE": "Sign up for Timetracker.One",
	"INVITATION_GUIDE": "You followed an invitation email to Timetracker.One. Please set a passwort below, and you'll be added directly to the team.",
	"JOIN_TEAM": "Join Team",
	"CREATE_NEW_ACCOUNT_BUTTON": "Create New Account",

	"EMAIL_TAKEN": "This email already belongs to an account",
	"ACCOUNT_NOT_FOUND": "Account not found",
	"PASSWORD_DOES_NOT_MATCH": "Password does not match",
	"EMAIL_NOT_VALID": "The provided email is not valid.",
	"CONNECTION_ERROR": "Connection error to the server – please try again",

	"DATE_FORMAT": "Date Format",
	"FIRST_WEEKDAY": "Beginning of the week",
	"SATURDAY": "Saturday",
	"SUNDAY": "Sunday",
	"MONDAY": "Monday"
})

/* export function i18nStoreInit() {
	setListener()
	getTranslations()
}

function setListener() {
	userStore.subscribe(userData => {
		if(userData.language != language) {
			language = userData.language
			getTranslations()
		}
	})
}

function getTranslations() {
	fetch('/i18n-'+ language +'.json').then(async res => {
			if (res.status !== 200) {
				return
			}

			const i18nObj = await res.json().catch(err => console.log(err))

			i18n.update(() => i18nObj)
		}
	).catch(err => console.log('Fetch Error', err))
} */

