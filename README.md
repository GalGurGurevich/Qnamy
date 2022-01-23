# Q-Nomy Frontend Developer Assignment

Q-Nomy creates customer journey management software. We provide solutions that
handle the entire process the customer goes through. Starting from finding and
booking appointments, getting information and notifications about upcoming
appointments, checking-in and waiting for service, as well as finding follow up
appointments and providing feedback about their experience.

## Background

This task simulates a simplified version of one of the tools used by companies
when dealing with customers - the agent console.

The agent console is the main tool many service personnel and receptionists use
to process the different customers and tasks they have to deal with throughout
the day.

It allows agents to get an overview of the cases that are queued up for them to
handle, and a case view where they can update the case info and resolve cases.

Since the cases different companies handle can differ dramatically (a patient
visit at a clinic will probably have very little in common with a PC repair
order at a repair lab), cases are composed of sets of dynamic fields. Some
fields are defined by the type of the case during its creation, while others
are added to a case later by automated processes or other means.

Fields are system-wide objects of different data types that are presented and
handled differently, and also have different settings and validation rules.

## Submission guidelines

You are provided with a starter project consisting of an empty react app and a
simple mock backend that has all the endpoints required to complete the task.

The task should be submitted as a git repository containing this project in its
entirety, with all of your work organized into sensible commits.
You can send us a zip, or upload it to the cloud git of your choice and send us
a link.

The mock server is implemented inside of the `src/mocks` directory. To avoid
any mix-ups, avoid touching the `src/mocks` directory (but feel free to look
through it if you find the [api reference](#api-reference) lacking).

The usage of additional npm packages is allowed.

## Requirements

You are to create a split view that contains a list of pending cases on one
side, and an editor for cases on the other side. The case list should show the
case ticket number and type.

Selecting a case from the list view will show the case details in the editor
view. The editor view should consist of a title showing the case ticket number
and type, as well as a form that allows the user to modify the values of the
different case fields and a button to save the modified case.

If any of the fields of the case are invalid it should not be possible to save
the case. But validation messages should only appear for dirty fields.

When any of the fields are dirty or invalid, a small indicator should appear
near the case title that the case has unsaved changes.

## Extra credit

The following are some optional features that you can implement if you feel
like you want an extra challenge.

You can also use them as a reference point when designing your solution for
things that the system might "need later down the line".

- Show a dirty/invalid indicator on the case list and allow the user to keep
  multiple cases in a dirty state, going back and forth between them.
- Add a "Complete" button to the case editor that will save the case if it's
  unsaved, and then remove it from the list. This button should be disabled
  if any of the case fields are invalid, but enabled if the case is not dirty.
- Add a "Create case" button that will allow the user to select a case type
  and fill in any of the required fields before adding the newly created case
  to the queue.

> **NOTE**: These are absolutely not required and you should have a completed
  project before you even think of starting one of them.

## Acceptance criterea

- The specification is intentionally defined in a relatively lax way. We want
  to understand your thought process and see how you design the system. What
  kinds of things you prioritize and consider. So, prioritize a solution you
  are happy with over a solution that covers as much ground as possible.
- Your code is judged on its quality, not on its complexity or quantity. Write
  clean, concise, expressive, and pragmatic code.
- While as a frontend developer you will be working with a lot of css, we do
  not expect you to be a professional graphic designer. Decent semantic html
  and a clean look is more than enough for us. Feel free to use your favorite
  third party styling solution if it saves you time.
- Don't waste time on tests. We are strong believers in the value of testing.
  But on a short assignment like this one, any line of code that is not
  directly related to the task is time thrown down the drain.

## Api reference

The api provided by this project is a small mock that persists its data to
localStorage. It is initialized with a valid set of fields, case types, and
cases and provides no validation whatsoever for any of the operations it
performs. If at any point your data ends up in an invalid state, you can always
reset it by clearing your localStorage.

### Endpoints:
- `POST /reset` - Resets the data that the mock server stores.
- `GET /fields` - Returns a list of all field types supported by the system
  including their settings.
- `GET /fields` - Returns a list of all case types supported by the system
  including the list of fields used by each case type.
- `GET /cases` - Returns all of the queued cases.
- `GET /cases/:caseId` - Returns a specific case by id.
- `PUT /cases/:caseId` - Updates an existing case.
- `POST /cases` - Creates a new case at the end of the queue. Returns the id of
  the new case.
- `DELETE /cases/:caseId` - Removes a case from the queue.

### Object schema:

``` typescript
type UUID = string;

interface Case {
  id: UUID,
  caseTypeId: UUID,
  caseType: string,
  ticket: string,
  fields: {
    fieldId: UUID,
    value: any,
  }[],
}

interface CaseType {
  id: UUID,
  name: string,
  fields: string[],
}

type Field  = BooleanFieldData | TextFieldData | NumericFieldData | ListFieldData;

interface FieldBase {
  id: UUID,
  label: string,
}

interface BooleanFieldData extends FieldBase {
  type: "Boolean",
  settings: {},
}

interface TextFieldData extends FieldBase {
  type: "Text",
  settings: {
    required: boolean,
    minLength: number | null,
    maxLength: number | null,
    pattern: string | null,
  },
}

interface NumericFieldData extends FieldBase {
  type: "Numeric",
  settings: {
    required: boolean,
    integer: boolean,
    min: number | null,
    max: number | null,
  },
}

interface ListFieldData extends FieldBase {
  type: "List",
  settings: {
    required: boolean,
    values: string[],
  },
}

```
