import { Sun, UserCircle } from '@untitledui/icons'

export default function SignUp() {
  return (
    <main className="mx-3 my-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div>
            <UserCircle className="size-8" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <div>John Smith</div>
            <div>Aklasjjh1243</div>
          </div>
        </div>
        <div>
          <Sun />
        </div>
      </div>
      <div>hello</div>
    </main>
  )
}
