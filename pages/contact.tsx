import type { BoxProps, TextareaProps } from '@chakra-ui/react'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Textarea
} from '@chakra-ui/react'
import { useForm, ValidationError } from '@formspree/react'
import { Section } from 'components/Section'
import type { InitialData } from 'hooks/data/useInitialData'
import { getInitialData } from 'hooks/data/useInitialData'
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import type { NextSeoProps } from 'next-seo'
import { NextSeo } from 'next-seo'
import baseUrl from 'utils/baseUrl'
import { createOgImageUrl } from 'utils/createOgImageUrl'

export interface StaticProps {
  fallback: {
    '/sanity/initialData': InitialData
  }
}

const ContactPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  fallback
}) => {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_KEY)

  const sharedStyles: BoxProps = {
    bgColor: 'cream.50',
    borderColor: 'cream.900',
    _hover: {
      borderColor: 'cream.700'
    }
  }

  const { siteTitle } = fallback['/sanity/initialData']
  const title = 'contact'
  const description = "Let's get in touch!"
  const url = createOgImageUrl(siteTitle ?? '', title).toString()

  const seo: NextSeoProps = {
    title,
    description,
    openGraph: {
      type: 'website',
      url: `${baseUrl}/contact`,
      title,
      description,
      images: [
        {
          url,
          width: 1200,
          height: 627
        }
      ]
    },
    twitter: {
      handle: '@rachelleyounie',
      site: baseUrl,
      cardType: 'summary_large_image'
    }
  }

  return (
    <>
      <NextSeo {...seo} />
      <Section>
        {state.succeeded ? (
          <Heading textAlign='center'>
            Thank you for your message! I&apos;ll get back to you as soon as I
            can.
          </Heading>
        ) : (
          <>
            <Heading size='xl' pb={{ base: 2, md: 6 }}>
              Get in Touch
            </Heading>
            <Flex
              as='form'
              display='flex'
              flexDirection='column'
              gap={6}
              onSubmit={handleSubmit}
            >
              <FormControl isRequired>
                <FormLabel htmlFor='email'>Email Address</FormLabel>
                <Input type='email' name='email' {...sharedStyles} />
                <ValidationError
                  prefix='Email'
                  field='email'
                  errors={state.errors}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor='name'>Full Name</FormLabel>
                <Input name='name' {...sharedStyles} />
                <ValidationError
                  prefix='Name'
                  field='name'
                  errors={state.errors}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor='message'>Message</FormLabel>
                <Textarea
                  name='message'
                  rows={10}
                  {...(sharedStyles as TextareaProps)}
                />
                <ValidationError
                  prefix='Message'
                  field='message'
                  errors={state.errors}
                />
              </FormControl>
              <FormControl>
                <Button
                  type='submit'
                  loadingText='Submitting...'
                  isLoading={state.submitting}
                  leftIcon={state.submitting ? <Spinner /> : undefined}
                  colorScheme='burntOrange'
                >
                  Submit
                </Button>
              </FormControl>
            </Flex>
          </>
        )}
      </Section>
    </>
  )
}
export default ContactPage

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const initialData = await getInitialData()
  const fallback = { '/sanity/initialData': initialData }

  return {
    props: {
      fallback
    }
  }
}
